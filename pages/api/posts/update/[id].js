import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res) {
    if(req.method !== 'PUT') return res.status(405).end();

    const auth = await authorization(req,res);

    const { id } = req.query;
    const { nama_barang, deskripsi, harga, stok, url_gambar } = req.body;

    const update = await db('produk').where({id}).update({nama_barang, deskripsi, harga, stok, url_gambar})
    
    const updatedData = await db('produk').where({id});

    res.status(200);
    res.json({
        message:'Produk berhasil dirubah',
        data: updatedData
    })
}