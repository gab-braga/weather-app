import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenWatherApiService } from 'src/app/services/open-wather-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  formSearch: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.formSearch = this.formBuilder.group({
      city: ['', Validators.required]
    });
  }

  public searchData() {
    if(this.formSearch.valid) {
      const { city } = this.formSearch.value;
      this.router.navigate([`/response/${city}`]);
    }
    else {
      window.alert("Não foi");
    }
  }
}
