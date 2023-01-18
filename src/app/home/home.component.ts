import { Component } from '@angular/core';
import { DroneService } from '../Services/drone.service';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	
	contents:any;
  pilot_info:any = [];
  messageSuccess:any;

  public xmlItems: any;  
	constructor(private droneService: DroneService, 
			private http: HttpClient,
			private activatedRoute: ActivatedRoute
		) {

	}
	ngOnInit() {
    console.log('Ahmad Sharif', 'https://github.com/TheAhmadSharif');
    this.droneService.fetchData() 
      .subscribe((data:any) => {  
        this.parseXML(data)  
          .then((data:any) => {  
            console.log(data, 'data');
            this.contents = data;  

           

          });  
      });  


      setTimeout(()=>{                          
          this.messageSuccess = false;
          if(this.pilot_info.length > 0) {
              this.pilot_info = [];
          }
      }, 8000);


      let JSONDatas = [
          {"id": "Open"},
          {"id": "OpenNew", "label": "Open New"}
      ]
    
    localStorage.setItem("datas", JSON.stringify(JSONDatas));
    
    let dataa = JSON.parse(localStorage.getItem("datas"));
    
    console.log(dataa);



        
}


getPilotInfo(serialNumber:any) {
  // const url = `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`;
  const url = `/assets/pilot.json`;
  this.http.get(url).subscribe( result => 
    {
        this.pilot_info.push(result);
    })
}

parseXML(data:any) {  
  return new Promise(resolve => {  
    var k: string | number,  
      arr = [],  
      parser = new xml2js.Parser(  
        {  
          trim: true,  
          explicitArray: true  
        });  
    parser.parseString(data,  (err, result) => {  
      var obj = result.report.capture[0].drone;  
      
      for (k in obj) {  
        const x = (25000 - obj[k].positionX[0]) ** 2;
        const y = (25000 - obj[k].positionY[0]) ** 2;

        const d = Math.sqrt(x + y);

        if(d <= 100) {
          const sn = obj[k].serialNumber[0];
          this.getPilotInfo(sn);

            arr.push({  
              "mac": obj[k].mac[0],
              "ipv4": obj[k].ipv4[0],
              "model": obj[k].model[0],
              "positionX": obj[k].positionX[0],
              "positionY": obj[k].positionY[0],
              "serialNumber": obj[k].serialNumber[0],
              "distance": d 
              
          });  
        }

        
        
      }  
      resolve(arr);  
    });  
  });  
}  
}
