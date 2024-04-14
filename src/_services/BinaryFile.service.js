
export class BinaryFileService {

    async  goGuardarDocumento(url, file) {
        const options = {
            method : "POST",
            body: file
        }
        return await fetch(url, options)
        .then((response) => response.json());
    }
}