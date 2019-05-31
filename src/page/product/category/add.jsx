
import React        from 'react';

import PageTitle    from 'component/page-title/index.jsx';

import Util         from 'util/bs.jsx'
import Product      from 'service/product-service.jsx'

const _bs           = new Util();
const _product      = new Product();


class CategoryAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList    : [],
            parentId        : 0,
            categoryName    : ''
        };
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    // 加载分类列表,显示父分类列表
    loadCategoryList(){
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList : res
            });
        }, errMsg => {
            _bs.errorTips(errMsg);
        });
    }
    // 表单的值发生变化
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value;
        this.setState({
            [name] : value
        });
    }
    // 提交
    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        // 分类名称不为空，提交数据
        if(categoryName){
            _product.saveCategory({
                parentId        : this.state.parentId,
                categoryName    : categoryName
            }).then((res) => {
                _bs.successTips(res);
                this.props.history.push('/product-category/index');
            }, (errMsg) => {
                _bs.errorTips(errMsg);
            });
        }
        // 否则，提示错误
        else{
            _bs.errorTips('请输入分类名称');
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="分类列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">所属分类</label>
                                </div>
                                <div className="col-md-3">
                                    <select name="parentId" 
                                        className="form-control"
                                        onChange={(e) => this.onValueChange(e)}>
                                        <option value="0">根分类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>根分类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">分类名称</label>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" className="form-control" 
                                        placeholder="请输入分类名称"
                                        name="categoryName"
                                        value={this.state.name}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-primary" 
                                        onClick={(e) => {this.onSubmit(e)}}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd;