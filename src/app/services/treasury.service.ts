import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {
  private baseUrl :string  = 'https://waz3ly.net/dashboard/api/dashboard';
  constructor(private _http : HttpClient) { }

  get_allTreasury()
  {
    return this._http.get(this.baseUrl + `/Treasurie`) ;
  }
  get_mainTreasury()
  {
    return this._http.get(this.baseUrl + `/mainTreasury`) ;
  }
  adding_Treasurie(data  :any )
  {
    return this._http.post(this.baseUrl + `/Treasurie` , data )
  }
  edit_Treasurie(data : any  , Treasurie_id :any )
  {
    return this._http.post(this.baseUrl + `/Treasurie/${Treasurie_id}?_method=PUT` , data)
  }
  delete_teasury(id : any ){
    return this._http.delete<any>(this.baseUrl +`/Treasurie/${id}` , id);
}

get_allTreasuryDrop()
{
  return this._http.get(this.baseUrl + `/allTreasuries`) ;
}

get_allTreasuryInMain(mainTreasuryId : any )
{
  return this._http.get(this.baseUrl + `/id_children_treasuries/${mainTreasuryId}`) ;
}

}
