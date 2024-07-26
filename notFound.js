const NotFound = (method,url,response)=>{
     response.writeHead(404,{"Context-Type":"plain/text"});
     response.end("Erro : 404, NOT - FOUND, Page you requested not found.");
        
}