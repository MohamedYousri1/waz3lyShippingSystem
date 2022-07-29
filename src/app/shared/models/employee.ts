export interface IEmployee {
  id: 0;
  first_name: string;
  second_name: string;
  last_name: string;
  national_id: string;
  phone_number: string;
  email: string;
  branch_id: number;
  department_id: number;
  job_id: number;
  address: string;
}













// first_name: new FormControl('', [Validators.required]),
// second_name: new FormControl('', [Validators.required]),
// last_name: new FormControl('', [Validators.required]),
// national_id: new FormControl(564, [Validators.required]),
// phone_number: new FormControl('', [Validators.min(11), Validators.max(13)]),

// email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[A-Z][a-z][0-8]{2-8}$/)]),
// branch_id: new FormControl(864, [Validators.required]),
// department_id: new FormControl(25, [Validators.required]),
// job_id: new FormControl(7, [Validators.required])
