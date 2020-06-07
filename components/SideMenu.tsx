import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import _ from 'lodash'

type state = {
    menuData: any
}


class SideMenu extends React.Component<{router},state> {

    constructor(props) {
        super(props);
        this.state = {
            menuData: [
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
                }
            ],
        };
    }

    onLinkClick = () => {
        
    }

    menuRender = (menu:any,idx:number,path:string) => {
        const { router } = this.props;
        const children = menu['children']
        const currentPath = path + `/${_.lowerCase(menu['name'])}`;
        if(children && children instanceof Array && children.length > 0) {
            return (
                <div key={menu['name'] + idx} className="side-menu-container">
                    <Link href={currentPath}>
                        <a className={`side-menu ${router.asPath === currentPath ? 'active' : ''}`} onClick={this.onLinkClick}>
                            {menu['name']}
                        </a>
                    </Link>
                    {children.map(item => this.menuRender(item,idx+1,currentPath))}
                </div>
            )
        } else {
            return (
                <div key={menu['name'] + idx} className="side-sub-menu-container">
                    <Link href={currentPath}>
                        <a className={`side-sub-menu ${router.asPath === currentPath ? 'active' : ''}`} onClick={this.onLinkClick}>
                            {menu['name']}
                        </a>
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="content-side">
                {this.state.menuData.map((item,idx) => {
                    return this.menuRender(item,idx,'/graphqlService');
                })}
            </div>
        )
    }
}

export default withRouter(SideMenu)