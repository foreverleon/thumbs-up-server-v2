import { Request, Response, Router } from 'express';
const noteRouter: Router = Router();
import * as path from "path";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from 'uuid';
import { TemporaryDataFile } from './model/note';
const filePath = path.join(__dirname, "..", "feed.json");


const getFeed = async (request: Request, response: Response) => {
    const data: TemporaryDataFile = await readDataJson(request, response);
    response.send(data.notes);
}

const readDataJson = async (request: Request, response: Response) => {
    const options = {
        encoding: 'string'
    }
    const result = await fs.readFile(filePath, "utf-8");
    const newData = JSON.parse(result);
    return newData;
}

const searchMember = async (request: Request, response: Response) => {
    const query = request.params.query.toLowerCase();
    // http://localhost:9000/search-member/r
    const data: TemporaryDataFile = await readDataJson(request, response);
    const found = data.members.filter(({ userName }) => {
        return userName.toLowerCase().includes(query);
    });
    response.send(found);
}

const createNote = async (request: Request, response: Response) => {
    console.log('createNote', request.body);
    const note = {
        "id": uuidv4(),
        "senderId": "1",
        "receiverId": "2",
        "channelId": "0",
        "gif": "",
        "createdDate": new Date()
    }

    // 1 - Read latest data
    const data = await readDataJson(request, response);

    // 2 - Add new note
    const updatedData = JSON.parse(JSON.stringify(data));
    updatedData.notes.push(note);

    // 3 - Write data to data file
    await fs.writeFile(filePath, JSON.stringify(updatedData));

    response.sendStatus(200);

    /*
    curl -X POST http://localhost:9000/note -H 'Content-Type: application/json'  -d '{"id":5000,"senderId":"1","receiverId":"2","channelId":"0","gif":""}'
    curl -X POST http://localhost:9000/note -d "option=value&something=anothervalue"
    curl -X POST http://localhost:9000/note -d "hello handsome"

*/
};

const createReply = (rrequest: Request, response: Response) => {
    response.send("Hello, I am express");

}

const like = (request: Request, response: Response) => {

    response.send("Hello, I am express");
}

noteRouter.get('/', (request: Request, response: Response) => {
    response.send("Hello, I am express");
});

noteRouter.get('/feed', getFeed);
noteRouter.get('/search-member/:query', searchMember);
noteRouter.post('/note', createNote);
noteRouter.post('/reply', createReply);
noteRouter.post('/like', like);

export default noteRouter;