const getNodeByName =function(name, data)  {
  for (let j = 0; j < data.length; j += 1) {
    if (data[j].name === name) {
      return data[j];
    }
  }
  return null;
};

const getChildrenNode =function (name, data, links){
  links.reduce((pre, link)=>{
    if (link.source === name){
      pre.push(getNodeByName(link.target, data));
      pre = pre.concat(getChildrenNode(link.target, data, links));
    }
    return pre;
  }, [])
};

const getFatherNumber =function (name, data, links)  {
  links.reduce((pre, link)=>  {
    if (link.target === name) {
      pre += 1;
      pre += getFatherNumber(link.source, data, links);
    }
    return pre;
  }, 0)
};

  var removeNodes=function (nodes, data, links)  {
    const nodeNames = nodes.map(node=>  node.name);
    return {
      data: data.reduce((pre, oneData) => {
        if (nodeNames.indexOf(oneData.name) === -1) {
          pre.push(oneData);
        }
        return pre;
      }, []),
      links: links.reduce((pre, link) => {
        if (nodeNames.indexOf(link.source) === -1 && nodeNames.indexOf(link.target) === -1) {
          pre.push(link);
        }
        return pre;
      }, []),
    }
  };

  var getFatherNode=function(name,data,links){
    for (let i = 0; i < links.length; i += 1) {
      if (links[i].target === name) {
        return getNodeByName(links[i].source, data);
      }
    }
    return data[0];
  };
  var getSymbolSize=function (index)  {
    if (index > 5) {
      return 30;
    }
    return 70 - (index * 8);
  };
  var centerNode={
    symbolSize: 80,
    category: 0,
    itemStyle: {
      normal: {
        color: '#005FD0',
      },
    },
    label: {
      normal: {
        position: 'right',
        formatter: (params)=>{
          const values = params.value || {};
          return values.username;
        },
        textStyle: {
          color: '#0064DB',
        },
      },
    },
  };
  var propertyNode={
    itemStyle: {
      normal: {
        color: '#009DF0',
      },
    },
    category: 1,
    label: {
      normal: {
        formatter: params => Object.keys(params.value)[0],
        textStyle: {
          color: 'white',
        },
      },
    },
  };
  var userNode={
    itemStyle: {
      normal: {
        color: '#F7C226',
      },
    },
    category: 2,
    label: {
      normal: {
        position: 'right',
        formatter:(params)=>  {
          const values = params.value || {};
          return values.username;
        },
        textStyle: {
          color: '#b17f24',
        },
      },
    },
  }

