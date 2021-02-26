import { EventBridge } from "aws-sdk";

export class EventBridgeConnection{
    
    private eventBridge: EventBridge;

    constructor(){
        this.eventBridge = new EventBridge()
    }

}