import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Car} from '../car';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../cars/car.service';
import {CarListComponent} from '../car-list/car-list.component';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  reload: CarListComponent;
  id: number;
  car: Car;
  submitted = false;


  constructor(private route: ActivatedRoute, private router: Router,
              private carService: CarService,
              private ref: ChangeDetectorRef) {
    setInterval(() => {
      this.ref.detectChanges();
    }, 1000);
  }

  ngOnInit(): void {
    this.car = new Car();

    this.id = this.route.snapshot.params['id'];

    this.carService.getCar(this.id)
      .subscribe(data => {
        console.log(data)
        this.car = data;
      }, error => console.log(error));
  }

  updateCar() {
    this.carService.updateCar(this.id, this.car)
      .subscribe(data => console.log(data), error => console.log(error));
    this.car = new Car();
    this.gotoList();
  }

  onSubmit() {
    this.updateCar();
    this.reload.reloadData();
  }

  gotoList() {
    this.router.navigate(['/cars']);
  }
}
