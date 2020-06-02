import React from 'react'
import Main from "./main"
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {shallow} from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

test("Schema Click Event Test", () => {
    const component = shallow(<Main/>);
    component.find(".main-menu-schema").simulate("click");
    expect(component.state("schemaDisplay")).toEqual('block');
    component.find(".main-menu-schema").simulate("click");
    expect(component.state("schemaDisplay")).toEqual('none');
})

test("Type Click Event Test", () => {
    const component = shallow(<Main/>);
    component.find(".main-menu-type").simulate("click");
    expect(component.state("typeDisplay")).toEqual('block');
    component.find(".main-menu-type").simulate("click");
    expect(component.state("typeDisplay")).toEqual('none');
})