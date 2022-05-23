import {Component, Input, OnInit} from '@angular/core';
import {DialogService} from "../../../service/dialog.service";

@Component({
  selector: 'app-dialog-position',
  templateUrl: './dialog-position.component.html',
  styleUrls: ['./dialog-position.component.scss']
})
export class DialogPositionComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  close(): void{
    this.dialogService.changeVisible();
  }

}
