const defaultColor = 'rgb(11,164,231)'

const genBtn = document.getElementById('genBtn')

genBtn.addEventListener('click', function () {
  const uid = document.getElementById('uid').value
  const username = document.getElementById('username').value
  const color = document.getElementById('color').value
  drawSignature(uid, username, color)
})

// 绘制签名档
function drawSignature (uid, username, color) {
  color = color || defaultColor

  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.clearRect(0, 0, 600, 110)

  ctx.save()

  drawLogo(ctx, 65, 50, color)

  // 签名卡背景
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = 'rgb(238,238,238)'
  drawRoundedPolygon(ctx, [{x: 0, y: 10}, {x: 600, y: 10}, {x: 600, y: 110}, {x: 0, y: 110}], 8)
  ctx.fill()

  // 个人信息
  ctx.globalCompositeOperation = 'source-atop'
  drawInfo(ctx, 130, 0, color, uid, username)

  ctx.restore()
}

// 绘制logo
function drawLogo (ctx, x, y, color) {
  ctx.save()
  ctx.translate(x, y)

  // 六边形
  ctx.fillStyle = color
  drawRoundedPolygon(ctx, getPolygonPoints(0, 0, 6, 50), 5)
  ctx.fill()

  ctx.globalCompositeOperation = 'source-atop'

  // 六边形内阴影
  ctx.fillStyle = 'rgba(0,0,0,0.05)'
  drawRoundedPolygon(ctx, getPolygonPoints(-2, -4, 6, 50), 5)
  ctx.fill()

  // 斜光影
  ctx.fillStyle = 'rgba(255,255,255,0.1)'
  ctx.rotate(-Math.PI / 6)
  ctx.beginPath()
  ctx.rect(-50, -50, 100, 50)
  ctx.closePath()
  ctx.fill()

  // 圆形光影1
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  ctx.beginPath()
  ctx.arc(0, -30, 40, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()

  // 圆形光影2
  ctx.fillStyle = 'rgba(255,255,255,0.3)'
  ctx.beginPath()
  ctx.arc(0, -60, 40, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()

  // 气泡长投影
  ctx.fillStyle = 'rgba(0,0,0,0.08)'
  ctx.beginPath()
  ctx.rect(-30, 0, 60, 60)
  ctx.closePath()
  ctx.fill()

  // 气泡投影
  ctx.fillStyle = 'rgba(0,0,0,0.1)'
  drawBubble(ctx, 0, 3, 30, 8, Math.PI / 2.3)
  ctx.fill()

  // 气泡
  ctx.fillStyle = 'rgb(238,238,238)'
  drawBubble(ctx, 0, 0, 30, 8, Math.PI / 2.3)
  ctx.fill()

  ctx.rotate(Math.PI / 6)

  // HAYO (Consolas)
  ctx.rotate(-Math.PI / 12)
  ctx.font = '24px Consolas'
  ctx.fillStyle = color
  ctx.fillText('HAYO', -25, 8)

  // Studio (Consolas)
  // ctx.font = '12px Consolas' // 最小字体12px
  // ctx.fillStyle = color
  // ctx.fillText('Studio', -13, 16)

  // ~ (华文隶书 STLiti bold)
  ctx.rotate(Math.PI / 16)
  ctx.font = 'bold 26px STLiti' // 最小字体12px
  ctx.fillStyle = 'rgb(238,238,238)'
  ctx.fillText('~', 26, -8)

  // 六边形外阴影
  ctx.globalCompositeOperation = 'destination-over'
  ctx.rotate(0.06)
  ctx.fillStyle = 'rgb(214,214,214)'
  drawRoundedPolygon(ctx, getPolygonPoints(3, 3, 6, 52), 5)
  ctx.fill()

  ctx.restore()
}

// 绘制个人信息
function drawInfo (ctx, x, y, color, uid, username) {
  ctx.save()
  ctx.translate(x, y)

  ctx.fillStyle = 'rgb(214,214,214)'
  drawRoundedPolygon(ctx, [{x: 0, y: 0}, {x: 200, y: 0}, {x: 200, y: 25}, {x: 0, y: 25}], 5)
  ctx.fill()

  ctx.fillStyle = color
  drawRoundedPolygon(ctx, [{x: 0, y: 31}, {x: 100, y: 31}, {x: 100, y: 56}, {x: 0, y: 56}], 5)
  ctx.fill()

  ctx.fillStyle = color
  drawRoundedPolygon(ctx, [{x: 0, y: 62}, {x: 150, y: 62}, {x: 150, y: 87}, {x: 0, y: 87}], 5)
  ctx.fill()

  ctx.fillStyle = 'rgb(214,214,214)'
  drawRoundedPolygon(ctx, [{x: 0, y: 93}, {x: 80, y: 93}, {x: 80, y: 118}, {x: 0, y: 118}], 5)
  ctx.fill()

  ctx.fillStyle = 'white'

  ctx.font = '12px Microsoft Yahei'
  ctx.fillText('UID', 5, 48)

  ctx.font = '14px Microsoft Yahei'
  ctx.fillText(uid, 30, 48)

  ctx.font = '14px Microsoft Yahei'
  ctx.fillText(username, 5, 80)

  ctx.fillStyle = color
  ctx.rotate(-Math.PI / 4)
  ctx.beginPath()
  ctx.rect(30, 200, 250, 50)
  ctx.closePath()
  ctx.fill()

  ctx.font = '14px Microsoft Yahei'
  ctx.fillStyle = 'rgb(238,238,238)'
  ctx.fillText('HAYO Studio', 80, 220)
  ctx.fillStyle = 'rgb(238,238,238)'
  ctx.fillText('专用签名档', 130, 240)

  ctx.restore()

  ctx.fillStyle = 'rgb(255,255,255)'
  ctx.beginPath()
  ctx.rect(505, 15, 90, 90)
  ctx.closePath()
  ctx.fill()

  const qrcode = document.getElementById('qrcode')
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(qrcode, 510, 20)

  ctx.fillStyle = 'rgb(180,180,180)'
  ctx.font = '12px Microsoft Yahei'
  ctx.fillText('HAYO Studio', 425, 85)
  ctx.fillText('审核群', 465, 100)
}

// 绘制普通多边形
// function drawPolygon (ctx, points) {
//   if (!points.length) return
//   ctx.beginPath()
//   const len = points.len
//   for (let i = 0; i < len; i++) {
//     const p = points[i]
//     if (i === 0) ctx.moveTo(p.x, p.y)
//     else ctx.lineTo(p.x, p.y)
//   }
//   ctx.closePath()
// }

// 绘制圆角多边形
function drawRoundedPolygon (ctx, points, radius) {
  if (!points.length) return
  const pointGroups = getRoundedPointGroups(points, radius)
  ctx.beginPath()
  const len = pointGroups.length
  for (let i = 0; i < len; i++) {
    const group = pointGroups[i]
    if (i === 0) ctx.moveTo(group.pre.x, group.pre.y)
    else ctx.lineTo(group.pre.x, group.pre.y)
    ctx.quadraticCurveTo(group.cur.x, group.cur.y, group.next.x, group.next.y)
  }
  ctx.closePath()
}

// 获取圆角坐标组（起始点，控制点，结束点）
function getRoundedPointGroups (points, radius) {
  const len = points.length
  const pointGroups = []
  for (let i = 0; i < len; i++) {
    let pre = (i - 1 < 0) ? points[len - 1] : points[i - 1]
    let next = (i + 1 === len) ? points[0] : points[i + 1]
    let cur = points[i]
    pre = getRoundedPoint(pre, cur, radius, false)
    next = getRoundedPoint(cur, next, radius, true)
    pointGroups.push({
      pre: pre,
      cur: cur,
      next: next
    })
  }
  return pointGroups
}

// 获取圆角坐标（起始点或结束点）
function getRoundedPoint (p1, p2, radius, first) {
  const total = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  const percent = first ? radius / total : (total - radius) / total
  return {
    x: p1.x + (percent * (p2.x - p1.x)),
    y: p1.y + (percent * (p2.y - p1.y))
  }
}

// 获取多边形点集
function getPolygonPoints (x, y, sides, radius, startAngle) {
  const points = []
  let angle = startAngle || 0
  for (let i = 0; i < sides; i++) {
    points.push({
      x: x + radius * Math.sin(angle),
      y: y + radius * Math.cos(angle)
    })
    angle += Math.PI * 2 / sides
  }
  return points
}

// 绘制气泡
function drawBubble (ctx, x, y, radius, gap, rotate) {
  const gapRadian = gap / radius
  const startAngle = gapRadian / 2
  const endAngle = -gapRadian / 2
  rotate = rotate || 0
  ctx.save()
  ctx.translate(x, y)
  ctx.beginPath()
  ctx.rotate(rotate)
  ctx.arc(0, 0, radius, startAngle, endAngle)
  ctx.lineTo(radius + gap, 0)
  ctx.closePath()
  ctx.restore()
}
