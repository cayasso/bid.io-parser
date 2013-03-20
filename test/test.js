var parser = require('..');
var expect = require('expect.js');
var encode = parser.encode;
var decode = parser.decode;
var packets = parser.packets;
var packetslist = parser.packetslist;

// tests encoding and decoding a packet

function test(obj){
  expect(decode(encode(obj))).to.eql(obj);
}

describe('parser', function(){

  it('exposes packet types', function(){
    expect(packets.fetch).to.be.a('number');
    expect(packets.query).to.be.a('number');
    expect(packets.lock).to.be.a('number');
    expect(packets.unlock).to.be.a('number');
    expect(packets.pending).to.be.a('number');
    expect(packets.complete).to.be.a('number');
    expect(packets.forcelock).to.be.a('number');
    expect(packets.forceunlock).to.be.a('number');
    expect(packets.error).to.be.a('number');
  });

  it('encodes fetch', function(){
    test({
      type: 'fetch',
      id: 123456,
      data: { owner: { id: 123456, name: 'a' } }
    });
  });

  it('encodes lock', function(){
    test({
      type: 'lock',
      id: 123456,
      data: { owner: { id: 123456, name: 'a' } }
    });
  });

  it('encodes forcelock', function(){
    test({
      type: 'forcelock',
      id: 123456,
      data: { owner: { id: 123456, name: 'a' } }
    });
  });

  it('encodes unlock', function(){
    test({
      type: 'unlock',
      id: 123456,
      data: { owner: { id: 123456 } }
    });
  });

  it('encodes forceunlock', function(){
    test({
      type: 'forceunlock',
      id: 123456,
      data: { owner: { id: 123456 } }
    });
  });

  it('encodes complete', function(){
    test({
      type: 'complete',
      id: 123456,
      data: { owner: { id: 123456, name: 'a' } }
    });
  });

});