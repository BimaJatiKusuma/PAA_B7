import db from '../../../libs/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
if(req.method !== 'POST') return res.status(405).end();

    console.log(req.body);
    const {email, password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt)
    console.log(passwordHash);

    const register = await db('user').insert({
        email,
        password:passwordHash
    })

    const registerdUser = await db('user')
    //.where({id:register}).first();
    //try this: https://gist.github.com/ntry/8a87ecb8427f044211dc3bfa390ff971#file-bootstrap-tutorial-gulp4-gulpfile-js
    //from discusstion: https://github.com/creativetimofficial/argon-design-system/issues/67

    res.status(200);
    res.json({
        message: 'user berhasil ditambahkan',
        data: registerdUser
    })
}