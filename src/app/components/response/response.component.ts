import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenWatherApiService } from 'src/app/services/open-wather-api.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  public formSearch: FormGroup;
  public data: any = null;
  public weatherImg: string = "https://openweathermap.org/img/wn/03d@4x.png";

  constructor(
    private service: OpenWatherApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.formSearch = this.formBuilder.group({
      city: ["", Validators.required]
    });
  }
  
  public ngOnInit(): void {
    this.initializeData();
  }

  public initializeData(): void {
    const city = this.route.snapshot.paramMap.get('city');
    if(city) {
      this.updatedData(city);
    }
    else {
      throw new Error("Preencha a pesquisa com uma cidade.");
    }
  }
  
  public searchData(): void {
    if(this.formSearch.valid) {
      const { city } = this.formSearch.value;
      this.updatedData(city);
    }
    else {
      window.alert("Preencha o campo de busca.");
    }
  }

  private updatedData(city: string): void {
    this.data = null
    this.service.getDataByCity(city).subscribe({
      next: data => {
        this.data = data;
        this.weatherImg = `https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`;
      },
      error: () => {
        window.alert("A cidade não existe. Tente novamente.");
        this.router.navigate(["/search"]);
      }
    });
  }
}
