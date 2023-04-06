import db from '../../../libs/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res){
    if(req.method !== 'POST') return res.status(405).end();

    const {email, password} = req.body;

    const checkUser = await db('user').where({email}).first();

    if(!checkUser) return (res.status(401).end())

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) return (res.status(401).end())

    console.log(checkPassword)

    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.email
        },
        'NothingToLose',
        {expiresIn: '1d'}
        )



    res.status(200);
    res.json({
        message: 'login successfully',
        token
    })

}