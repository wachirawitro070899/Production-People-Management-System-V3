const ROOT_FOLDER_ID = '1teHJMKOl5wbmayEehnA-fObS4hQJRT9q';
const API_TOKEN = '-xlgBT7v37V0Uw3agtk3V8JdvYdqVCXG';

function doGet(e) {
  try {
    const q = (e && e.parameter) || {};
    if (q.action !== 'list' && q.action !== 'all') return jsonOutput({ok:true, service:'PPMS Employee Photo Drive API', time:new Date().toISOString()});
    if (!q.token || q.token !== API_TOKEN) throw new Error('Invalid access token');
    const rootId = q.folderId || ROOT_FOLDER_ID;
    if (rootId !== ROOT_FOLDER_ID) throw new Error('Folder ID not allowed');
    const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
    const preferredFolder = chooseFolderName(q.section, q.sortingGroup);
    const files = [];
    if (q.action === 'all') {
      collectImageFilesRecursive(root, files, 'Root');
    } else {
      const folders = root.getFolders();
      while (folders.hasNext()) {
        const folder = folders.next();
        if (q.section && folder.getName() !== preferredFolder) continue;
        collectImageFiles(folder, files);
      }
      // รองรับรูปที่วางไว้ตรงโฟลเดอร์หลักด้วย
      collectImageFiles(root, files, true);
    }
    files.sort(function(a,b){ return String(b.updatedAt).localeCompare(String(a.updatedAt)); });
    return jsonOutput({ok:true, folderName:preferredFolder, files:files.slice(0,1000)});
  } catch (err) {
    return jsonOutput({ok:false,error:String(err && err.message ? err.message : err)});
  }
}

function collectImageFiles(folder, output, rootOnly) {
  const it = folder.getFiles();
  while (it.hasNext()) {
    const file = it.next();
    const mime = String(file.getMimeType() || '');
    if (mime.indexOf('image/') !== 0) continue;
    try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (shareError) {}
    output.push({
      id:file.getId(),
      name:file.getName(),
      folderName:rootOnly ? 'Root' : folder.getName(),
      mimeType:mime,
      updatedAt:file.getLastUpdated().toISOString(),
      viewUrl:'https://drive.google.com/thumbnail?id='+file.getId()+'&sz=w1000',
      thumbnailUrl:'https://drive.google.com/thumbnail?id='+file.getId()+'&sz=w400',
      driveUrl:file.getUrl()
    });
  }
}

function collectImageFilesRecursive(folder, output, path) {
  collectImageFiles(folder, output, path === 'Root');
  const folders = folder.getFolders();
  while (folders.hasNext()) {
    const child = folders.next();
    collectImageFilesRecursive(child, output, path + '/' + child.getName());
  }
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!body.token || body.token !== API_TOKEN) throw new Error('Invalid upload token');
    const rootId = body.folderId || ROOT_FOLDER_ID;
    if (rootId !== ROOT_FOLDER_ID) throw new Error('Folder ID not allowed');
    const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
    const folderName = chooseFolderName(body.section, body.sortingGroup);
    const folder = getOrCreateFolder(root, folderName);
    const match = String(body.dataUrl || '').match(/^data:([^;]+);base64,(.+)$/);
    if (!match) throw new Error('Invalid image data');
    const mimeType = match[1];
    if (!/^image\/(jpeg|png|webp)$/i.test(mimeType)) throw new Error('Only JPG, PNG and WEBP are allowed');
    const bytes = Utilities.base64Decode(match[2]);
    if (bytes.length > 8 * 1024 * 1024) throw new Error('Image is larger than 8 MB');
    const fileName = sanitizeName(body.fileName || ((body.employeeId || 'employee') + '.jpg'));
    const existing = folder.getFilesByName(fileName);
    while (existing.hasNext()) existing.next().setTrashed(true);
    const file = folder.createFile(Utilities.newBlob(bytes, mimeType, fileName));
    try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (shareError) {}
    return jsonOutput({ok:true,fileId:file.getId(),fileName:file.getName(),folderName:folderName,viewUrl:'https://drive.google.com/thumbnail?id='+file.getId()+'&sz=w1000',driveUrl:file.getUrl()});
  } catch (err) {
    return jsonOutput({ok:false,error:String(err && err.message ? err.message : err)});
  }
}

function chooseFolderName(section, sortingGroup) {
  if (section === 'Sorting Section' && (sortingGroup === 'Sorting 1' || sortingGroup === 'Sorting 2')) return sortingGroup;
  return String(section || 'Unassigned').replace(/ Section$/i, '').trim() || 'Unassigned';
}

function getOrCreateFolder(parent, name) {
  const folders = parent.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : parent.createFolder(name);
}

function sanitizeName(name) {
  return String(name).replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^_+|_+$/g, '').substring(0, 120) || ('employee_' + Date.now() + '.jpg');
}

function jsonOutput(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
