/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('produk', function(table){
    table.increments();
    table.string('nama_barang');
    table.text('deskripsi');
    table.bigInteger('harga');
    table.integer('stok');
    table.string('url_gambar')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('produk');
};
