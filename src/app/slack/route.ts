// typescript-eslint-disable no-unsafe-assignment

import { NextRequest, NextResponse } from "next/server"
import { WebClient, LogLevel } from "@slack/web-api";

import { db } from "../../server/db";

const client = new WebClient(process.env.SLACK_TOKEN, {
  logLevel: LogLevel.DEBUG
});

interface ChallengeResponse {
    token: string
    challenge: string
    type: string
}

export async function POST(request:NextRequest){
    const data = await request.json()
    if('challenge' in data){
        const challenge: ChallengeResponse = data
        try {
            const result = await client.users.list({});
            if(result.ok && result.members){
                result.members.forEach(async (member)=>{ //eslint-disable-line
                    if (!member.deleted){
                        console.log()
                        const user = {
                            slack_id: member.id ? member.id: "",
                            name: member.real_name ? member.real_name: ""
                        }
                        await db.user.create({data: user})
                    }
                })
            }
            console.log(result)
          }
          catch (error) {
            console.error(error);
          }
        return NextResponse.json(challenge.challenge)
    }else{
        const {event} = data // eslint-disable-line
        console.log(event)
        switch (event.type) {   // eslint-disable-line
            case 'user_change':
                console.log(event.user)
                if(event.user.deleted == true){
                    await db.user.delete({
                        where:{slack_id: event.user.id}
                    })
                }
                else{
                    console.log(event)
                    const user = await db.user.findUnique({
                        where: {    
                          slack_id: event.user.id,
                        },
                      })
                    if (user) {
                        await db.user.update({
                            where:{id:user.id},
                            data:{
                                name: event.user.real_name
                            }
                        })    
                    }    
                }
                break;
            case 'team_join':
                console.log(event)
                const newUser = {
                    slack_id: event.user.id,
                    name: event.user.real_name
                }
                await db.user.create({ data: newUser })
                break;                  
            default:
                break;
        }
        return NextResponse.json("Message Recieved")
    }
}

export async function GET(){
    const data = await db.user.findMany()
    return NextResponse.json({data})
}
