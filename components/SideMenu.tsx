import React, { useState } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import _ from 'lodash'

function SideMenu(props) {

    const [menuData,setMenuData] = useState([
        {
            name: "Schema",
            children: [
                {
                    name: "Query",
                    children: []
                },
                {
                    name: "Mutation",
                    children: []
                }
            ]
        },
        {
            name: "Type",
            children: [
                {
                    name: "Type",
                    children: []
                },
                {
                    name: "Enum",
                    children: []
                },
                {
                    name: "Interface",
                    children: []
                },
                {
                    name: "Union",
                    children: []
                }
            ]
        },
        {
            name: "Test",
            children: []
        }
    ])

    const onLinkClick = () => {
        
    }

    const menuRender = (menu:any,idx:number,path:string) => {
        const { router } = props;
        const children = menu['children']
        const currentPath = path + `/${_.lowerCase(menu['name'])}`;
        if(children && children instanceof Array && children.length > 0) {
            return (
                <div key={menu['name'] + idx} className="side-menu-container">
                    <Link href={currentPath}>
                        <a className={`side-menu ${router.asPath === currentPath ? 'active' : ''}`} onClick={onLinkClick}>
                            {menu['name']}
                        </a>
                    </Link>
                    {children.map(item => menuRender(item,idx+1,currentPath))}
                </div>
            )
        } else {
            return (
                <div key={menu['name'] + idx} className="side-sub-menu-container">
                    <Link href={currentPath}>
                        <a className={`side-sub-menu ${router.asPath === currentPath ? 'active' : ''}`} onClick={onLinkClick}>
                            {menu['name']}
                        </a>
                    </Link>
                </div>
            )
        }
    }

    return (
        <div className="content-side">
            {menuData.map((item,idx) => {
                return menuRender(item,idx,'/graphqlService');
            })}
        </div>
    )
    
}

export default withRouter(SideMenu)