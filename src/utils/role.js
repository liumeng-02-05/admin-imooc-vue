import Layout from '@/layout'
export function formatTree(data) {
  data.forEach(function(item) {
    delete item.children
  }) // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map = {}
  data.forEach(function(item) {
    map[item.id] = item
  })
  const val = []
  data.forEach(function(item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    const parent = map[item.pid] // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      // 如果没有在map中找到对应的索引id,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item)
    }
  })
  return val
}

export function setMenu(menu) {
  const newMenu = []

  menu.map((item, index) => {
    if (!item) {
      return
    }
      const obj = {
        name: item.name,
        path: item.redirect,
        id: item.id,
        pid: item.pid,
        hidden: !!item.hidden,
        meta: {
          title: item.name,
          icon: item.icon
        }
      }
      let component
      try {
        component = require(`../views${item.url}`).default
      } catch (error) {
        component = ''
      }

      if (item.pid === 0) {
        obj.component = Layout
      } else if (component) {
        obj.component = component
      }
      newMenu.push(obj)
  })
  return newMenu
}

