import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseUrl : string  = "https://waz3ly.net/dashboard/api/dashboard";
  constructor(private _http:HttpClient) { }

  get_all_Roles()
  {
    return this._http.get(this.baseUrl + '/all-role');
  }

  get_all_Permissions()
  {
    return this._http.get(this.baseUrl + '/allPermissions');
  }
  add_role(roleData:any)
  {
    return this._http.post(this.baseUrl + '/roles' ,  roleData )
  }
  get_role_with_permission(roleid:any)
  {
    return this._http.get(this.baseUrl +  `/roles/${roleid}`)
  }
  update_role(roleData :any  , roleID:any )
  {
    return this._http.post(this.baseUrl + `/roles/${roleID}?_method=PUT` ,roleData);
  }
  delete_role(role:any)
  {
    return this._http.delete<any>(this.baseUrl +`/role/${role.id}` , role.id);
  }
}
