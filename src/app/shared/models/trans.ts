export interface Trans {
    id:number,
    date_of_receipt:Date;
    date_of_delivery:Date;
    from_branch_id:number;
    to_branch_id:number;
    employee_id:number;
    shipment_id:number;
    receive_status_id:number;
}
