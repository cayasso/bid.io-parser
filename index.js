
/**
 * Module dependencies.
 */

var debug = require('debug')('bid.io-parser');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 1;

/**
 * Packet types.
 *
 * @api public
 */

var packets = exports.packets = {
  fetch:        0,
  query:        1,
  lock:         2,
  unlock:       3,
  pending:      4,
  complete:     5,
  claim:        6,
  forceunlock:  7,
  error:        8,
  update:       9
};

/**
 * Packet keys.
 *
 * @api public
 */

var packetslist = exports.packetslist = keys(packets);

/**
 * Premade error packet.
 */

var error = { type: 'error', data: 'parser error' };

/**
 * Encode.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api public
 */

exports.encode = function(obj){
  var str = '';

  // first is type
  str += packets[obj.type];

  // immediately followed by the bid id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    str += JSON.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
};

/**
 * Decode.
 *
 * @param {String} str
 * @return {Object} packet
 * @api public
 */

exports.decode = function (str) {

  var p = {}, i = 0;

  if (null == str) return error;

  // look up type
  p.type = packetslist[Number(str.charAt(0))];
  if (null == p.type) return error;

  // look up id
  var next = str.charAt(i + 1);
  if ('' != next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i + 1 == str.length) break;
    }
  }

  // look up json data
  if (str.charAt(++i)) {
    try {
      p.data = JSON.parse(str.substr(i));
    } catch(e){
      return error;
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
};

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

function keys (obj){
  if (Object.keys) return Object.keys(obj);
  var arr = [];
  var has = Object.prototype.hasOwnProperty;
  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
}