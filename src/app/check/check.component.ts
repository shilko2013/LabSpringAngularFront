import {Component, OnInit} from '@angular/core';
import {UserLoginService} from '../user-login/user-login.service';
import {Router} from '@angular/router';
import {ResultService} from '../result/result.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  private x = 0;
  private y;
  private r = 1;
  private xError = '';
  private yError = '';
  private rError = '';
  private results = [];
  private width = 400;
  private height = 400;
  private canvasR = 90;
  private extraValue = 0;


  constructor(private _userLoginService: UserLoginService,
              private _router: Router,
              private _resultService: ResultService) {
  }

  ngOnInit() {
    this.drawPoints();
  }

  disableSession() {
    this._router.navigate(['']);
  }

  unsetErrors() {
    this.xError = '';
    this.yError = '';
    this.rError = '';
  }

  check() {
    this.unsetErrors();
    const yVal = Number(String(this.y).replace(',', '.'));
    if (yVal < -5 || yVal > 3) {
      this.yError = 'Неверное значение Y';
      this.y = '';
      return false;
    }
    if (![-2, -1.5, -1, -0.5, -0, 0.5, 1, 1.5, 2].includes(this.x)) {
      this.xError = 'Неверное значение Y';
      this.x = 0;
      return false;
    }
    if (![0.5, 1, 1.5, 2].includes(this.r)) {
      this.rError = 'Неверное значение R';
      this.r = 0;
    }
    return true;
  }

  getCustomR() {
    const result = this.r * this.canvasR;
    if (isNaN(result) || result < this.canvasR || result > this.canvasR * 2) {
      return this.canvasR;
    } else {
      return result;
    }
  }

  canvasSubmit(event: MouseEvent) {
    const rect = document.getElementById('canvas').getBoundingClientRect();
    this.x = (event.clientX - rect.left - this.width / 2) / this.getCustomR() * this.r;
    this.y = (this.height / 2 - (event.clientY - rect.top)) / this.getCustomR() * this.r;
    if (this.x < -2) {
      this.x = -3;
    }
    if (this.x > 2) {
      this.x = 3;
    }
    this.x = (Math.round(this.y * 2) * 1.) / 2;
    this.submit();
  }

  submit() {
    if (!this.check()) {
      return;
    }
    this._resultService.addPoint(this.x, this.y, this.r, )
      .subscribe(() => {
        this._resultService.getPoints()
          .subscribe(data => this.results = Array.of(data));
      }, () => {
        this.rError = 'Ошибка отправки запроса!';
      });
  }

  drawPoints() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const customR = this.getCustomR();

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.width + this.extraValue, this.height + this.extraValue);

    ctx.fillStyle = '#03899C';
    ctx.beginPath();
    ctx.moveTo(this.width / 2, this.height / 2);
    ctx.lineTo(this.width / 2 + customR, this.height / 2);
    ctx.lineTo(this.width / 2 + customR, this.height / 2 + customR / 2);
    ctx.lineTo(this.width / 2, this.height / 2 + customR / 2);
    ctx.lineTo(this.width / 2 - customR / 2, this.height / 2);
    ctx.lineTo(this.width / 2 - customR, this.height / 2);
    ctx.arc(this.width / 2, this.height / 2, customR, Math.PI, 3 * Math.PI / 2, false);
    ctx.lineTo(this.width / 2, this.height / 2);
    ctx.stroke();
    ctx.fill();

    let allPointExist = true;

    const values = this.results;
    if (values.length > 0) {
      for (let i = 0; i < values.length; ++i) {
        allPointExist = allPointExist && this.drawPoint(ctx,
          values[i].x,
          values[i].y,
          values[i].r,
          values[i].checking,
          undefined);
      }
    }

    if (!allPointExist) {
      this.drawWarningMessage(ctx, 'Не все точки будут отображены!', '#dc9100');
    }

    this.drawBase(ctx, customR);
  }

  drawPoint(ctx, x, y, r, match, color) {
    if (color) {
      ctx.fillStyle = color;
    } else if (!match) {
      ctx.fillStyle = '#FFAE00';
    } else {
      ctx.fillStyle = '#00D300';
    }
    const customR = this.getCustomR();
    const pointX = x * customR / r + this.width / 2;
    const pointY = -y * customR / r + this.height / 2;
    if (pointX < 0 || pointY < 0 || pointX > this.width || pointY > this.height) {
      return false;
    } else {
      ctx.beginPath();
      ctx.arc(pointX, pointY, 2, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fill();
    }
    return true;
  }

  drawWarningMessage(ctx, message, color) {
    ctx.fillStyle = color;
    ctx.font = '10px Arial';
    ctx.fillText(message, 0, this.height);
  }

  drawBase(ctx, customR) {

    ctx.beginPath();
    ctx.moveTo(0, this.height / 2);
    ctx.lineTo(this.width + this.extraValue, this.height / 2);
    ctx.lineTo(this.width - 10 + this.extraValue, this.height / 2 - 5);
    ctx.moveTo(this.width + this.extraValue, this.height / 2);
    ctx.lineTo(this.width - 10 + this.extraValue, this.height / 2 + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width / 2, this.height + this.extraValue);
    ctx.lineTo(this.width / 2, 0);
    ctx.lineTo(this.width / 2 - 5, 10);
    ctx.moveTo(this.width / 2, 0);
    ctx.lineTo(this.width / 2 + 5, 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width / 2 + customR / 2, this.height / 2 - 5);
    ctx.lineTo(this.width / 2 + customR / 2, this.height / 2 + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width / 2 - 5, this.height / 2 - customR / 2);
    ctx.lineTo(this.width / 2 + 5, this.height / 2 - customR / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width / 2 - 5, this.height / 2 + customR);
    ctx.lineTo(this.width / 2 + 5, this.height / 2 + customR);
    ctx.stroke();

    ctx.fillStyle = '#03899C';
    ctx.font = '10px Arial';
    ctx.fillText('X', this.width - 10 + this.extraValue, this.height / 2 - 15);
    ctx.fillText('Y', this.width / 2 - 18, 12);
    ctx.fillText('R', this.width / 2 + customR - 5, this.height / 2 - 5);
    ctx.fillText('R', this.width / 2 + 4, this.height / 2 - customR + 5);
    ctx.fillText('-R', this.width / 2 - customR - 5, this.height / 2 + 15);
    ctx.fillText('-R', this.width / 2 + 4, this.height / 2 + customR + 5);
    ctx.fillText('R/2', this.width / 2 + customR / 2 - 5, this.height / 2 - 5);
    ctx.fillText('R/2', this.width / 2 + 6, this.height / 2 - customR / 2 + 2);
    ctx.fillText('-R/2', this.width / 2 - customR / 2 - 15, this.height / 2 + 15);
    ctx.fillText('-R/2', this.width / 2 + 4, this.height / 2 + customR / 2 + 9);
  }
}
