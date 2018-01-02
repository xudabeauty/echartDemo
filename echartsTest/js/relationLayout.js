/**
 * 转换角度
 * @param {number} angle
 */
const angleToRad = angle => (angle * Math.PI) / 180;

/**
 * 获得一个随机长度
 */
const getLen = () => Math.round(Math.random() * 13) + 7;

/**
 * 根据展开结点的个数，返回每个节点偏移的角度
 * @param {number} n
 */
const getAngles = (n) => {
  const angle = 180 / (n + 1);
  const angles = [];
  let init = 90;
  for (let i = 0; i < n; i += 1) {
    init -= angle;
    angles.push(init);
  }
  return angles;
};


/**
 * 根据父节点和父父结点坐标，偏移角度，与父节点之间的距离计算新结点的坐标
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} len
 * @param {number} angle
 */
const getCoordinate = function(x1, y1, x2, y2, len, angle) {
  const delX = (len * Math.cos(Math.atan((y2 - y1) / (x2 - x1)) + angleToRad(angle)));
  const delY = (len * Math.sin(Math.atan((y2 - y1) / (x2 - x1)) + angleToRad(angle)));
  if (y2 - y1 < 0 && x2 - x1 < 0) {
    return {
      y: y2 - delY,
      x: x2 - delX,
    }
  }
  if (y2 - y1 > 0 && x2 - x1 < 0) {
    return {
      y: y2 - delY,
      x: x2 - delX,
    }
  }
  return {
    y: y2 + delY,
    x: x2 + delX,
  }
};


  /**
   * 根据展开结点的个数，返回中心点展开的结点
   */
  var getCenterSpread= function(n) {
    const angle = 360 / n;
    const angles = [];
    let init = 360 * Math.random();
    for (let i = 0; i < n; i += 1) {
      init += angle;
      angles.push(init);
    }
    const nodes = angles.map(a => (
      {
        x: getLen() * Math.cos(angleToRad(a)),
        y: getLen() * Math.sin(angleToRad(a)),
      }
    ));
    return nodes;
  },
  /**
   * 根据展开结点的个数，以及父节点和父父节点返还展开的结点
   */
  getNodeSpread=(x1, y1, x2, y2, n) => {
    const angles = getAngles(n);
    const nodes = angles.map(a => getCoordinate(x1, y1, x2, y2, getLen(), a));
    return nodes;
  };

