import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

export abstract class AbstractNotificationService{
    
    protected serviceName: string = 'Name not defined'
    protected notificationGenerator: Subject<string>

    constructor(serviceName: string){
        this.serviceName = serviceName
    }

    public getNotificationGenerator(): Observable<string>{
       if(!this.notificationGenerator)
            this.notificationGenerator = new Subject<string>();

       return this.notificationGenerator.asObservable()
    }
    
    public name(): string{
       return this.serviceName
    }

    protected notifyError = (err): void  => {
        this.notificationGenerator.error(err)
    }

    protected notifyMsg = (msg: string): void => {
        this.notificationGenerator.next(msg)
    }
}