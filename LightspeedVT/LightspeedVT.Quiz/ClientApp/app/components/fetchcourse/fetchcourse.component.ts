import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SortableModule } from '@progress/kendo-angular-sortable';
//import { HttpClientModule } from '@angular/common/http';
//import { AngularSvgIconModule } from 'angular-svg-icon';
//import { InlineSVGModule } from 'ng-inline-svg';
import { Subscription } from "rxjs";
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'

@Component({
    selector: 'fetchcourse',
    templateUrl: './fetchcourse.component.html',
    styleUrls: ['./fetchcourse.component.css']
})
export class FetchCourseComponent {
    public http: Http;
    public baseUrl: string;

    public course: Course;
    public question: Question;
    public currentCourseId: number = 1;
    public currentQuestionSortOrder: number = 1;

    public counterInit: number = 10;
    public counter: number = this.counterInit;
    public countMinute: string = '00';
    public countSecond: string = '00';
    public subscription: Subscription;
    public alertMessage: string = "";

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
        this.baseUrl = baseUrl;


        //load the first question
        this.loadCurrentQuestion();

        ////start the timer
        //this.countDownSecond = Observable.timer(0, 1000)
        //    .take(this.counter)
        //    .map(() => this.decrementCounter());

        //http.get(baseUrl + 'api/quiz/question/1/1').subscribe(result => {
        //    this.question = result.json() as Question;
        //}, error => console.error(error));
    }

    ngOnInit() {
        
    }

    public loadCurrentQuestion() {
        //clear any alert messages
        this.alertMessage = "";

        this.http.get(this.baseUrl + 'api/quiz/course/' + this.currentCourseId).subscribe(result => {
            this.course = result.json() as Course;
            this.question = this.course.questions[this.currentQuestionSortOrder-1];
        }, error => console.error(error));

        //start the timer
        let timer = Observable.timer(0, 1000);
        this.subscription = timer.subscribe(t => {
            this.decrementCounter();
        });

        this.setCounter(this.counterInit + 1);
        
    }

    public nextQuestion() {
        //stop the current timer
        this.subscription.unsubscribe();

        //write out the user sorted order
        console.log(this.question.name);
        for (var answer of this.question.answers) {
            console.log(answer.name);
        }

        this.currentQuestionSortOrder++;
        this.loadCurrentQuestion();
    }

    private setCounter(newCounter: number) {
        this.counter = newCounter;
    }

    private decrementCounter() {
        --this.counter;

        var tempCountMinute = Math.floor(this.counter / 60);
        if (tempCountMinute < 10) {
            this.countMinute = '0' + tempCountMinute;
        }
        else 
        {
            this.countMinute = tempCountMinute.toString();
        }

        //update minute and second
        var tempCountSecond = this.counter % 60;
        if (tempCountSecond < 10) {
            this.countSecond = '0' + tempCountSecond;
        }
        else {
            this.countSecond = tempCountSecond.toString();
        }

        if (tempCountMinute == 0 && tempCountSecond == 0) {
            //show message and stop counting down
            this.subscription.unsubscribe();
            this.alertMessage = "Timer has expired. Please click Submit.";
        }

        return this.counter;
    }
}

interface Course {
    id: number;
    name: string;
    questions: Question[];
}

interface Question {
    id: number;
    name: string;
    sortOrder: number;
    answers: Answer[];
}

interface Answer {
    id: number;
    name: string;
    sortOrder: number;
}