export class EncodePDF 
{
    async downloadFile(url) 
    {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf;charset=UTF-8"
            }
        }
        return await fetch(url,options)
        .then((response) => response.blob())
        .then((myBlob) => {

            return new Promise(async (resolve, reject) => {
                
                const reader = new FileReader();
                reader.readAsDataURL(myBlob);
                reader.onloadend = async () => {
                    resolve(reader.result);
                }      
            });
 

            
        });
    }
}