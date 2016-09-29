import {Subject} from 'rxjs/Subject'

export class AbstractNotificationService{
    
    protected serviceName: string = 'Name not defined'
    protected notificationGenerator: Subject<string>

    constructor(serviceName: string){
        this.serviceName = serviceName
    }

    public getNotificationGenerator(): Subject<string>{
       if(!this.notificationGenerator)
            this.notificationGenerator = new Subject<string>();

       return this.notificationGenerator
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