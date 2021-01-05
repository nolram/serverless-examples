import { EventBridge } from "aws-sdk";

export class EventBridgeConnection{
    
    private eventBridge: EventBridge;

    constructor(){
        if (process.env.IS_OFFLINE === 'true') {
            this.eventBridge = new EventBridge({
                endpoint: 'http://127.0.0.1:4010',
                accessKeyId: "AKIAJFEMLGBRJCVVVSJA",
                secretAccessKey: "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",
                region: "us-east-1"
            })
        }else{
            this.eventBridge = new EventBridge()
        }
    }

    /**
     * putEvent
     */
    public putEvent(eventBusName: string, source: string, detailType: string, detail: string): Promise<any> {
        return this.eventBridge.putEvents({
            Entries: [
                {
                    EventBusName: eventBusName,
                    Source: source,
                    DetailType: detailType,
                    Detail: detail
                }
            ]
        }).promise()
    }
}