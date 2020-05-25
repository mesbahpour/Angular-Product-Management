import { Component, Input} from '@angular/core';
import { ProjectService } from '../projectService.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html'
})


export class SharedComponent {
  data:any;

  @Input() items 
  @Input() headers;
  @Input() title;
 
  
 constructor(public router:Router ,public projectService:ProjectService ){}

  get getKeys() {
    return Object.keys(this.headers); 
  }
  
  get getValues(){
    return Object.values(this.headers); 
  }

  showProducts(id){
    if(this.router.url=='/'){
      this.router.navigate(['/company',id]);
    }
  }



}
