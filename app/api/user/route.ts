// pages/api/addUser.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { NextResponse } from 'next/server';

const path = '@/db.json';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Load the existing JSON data
        // const jsonData = require(path);

        // Extract user data from the request body
        // console.log(req.body)
        let passedValue = await new Response(req.body).text();
        let bodyreq = JSON.parse(passedValue);
        const { name, username, password } = bodyreq;
        const newUser = {
            email: name,
            username,
            password,
        };

        // Add the new user to the 'user' array
        // jsonData.user.push(newUser);

        // Convert the updated data back to JSON
        // const updatedJsonData = JSON.stringify(jsonData, null, 2);
        // console.log(updatedJsonData)
        // // Write the updated data back to the file
        // fs.writeFileSync(path, updatedJsonData);

        return  NextResponse.json(newUser)
    } catch (error) {
        console.error('Error adding user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
