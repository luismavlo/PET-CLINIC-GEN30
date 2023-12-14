import { utilsFirebase } from '../../config/plugins/firebase.plugin.js';

export class UploadFile {

  static async uploadToFirebase(path, data){
    const imgRef = utilsFirebase.ref(
      utilsFirebase.storage,
      path
    );

    await utilsFirebase.uploadBytes(imgRef, data);

    return await utilsFirebase.getDownloadURL(imgRef)

  }

  static async uploadMultipleFilesToFirebase(path, filesData, uuid) {
    const uploadPromises = filesData.map(async ({ originalname, buffer }) => {
      const filePath = `${path}/${uuid}-${originalname}`;
      const fileRef = utilsFirebase.ref(utilsFirebase.storage, filePath);

      await utilsFirebase.uploadBytes(fileRef, buffer);

      return utilsFirebase.getDownloadURL(fileRef);
    });

    // Ejecuta todas las operaciones de carga de archivos de forma concurrente.
    const downloadURLs = await Promise.all(uploadPromises);

    return downloadURLs;
  }

}