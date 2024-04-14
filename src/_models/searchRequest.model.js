export class SearchRequestModel {

    constructor(filter, range, search, sort){
        this.filter = filter;
        this.from = 0;
        this.index = "remitos";
        this.range = range;
        this.routing = "routing"
        this.search = search;
        this.size = 0
        this.sort = sort;
        this.tipoVista = "tipoVista"
    }

    
}