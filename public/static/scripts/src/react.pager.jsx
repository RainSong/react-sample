"use strict"

var React = require('react');
var PageButton = require('./react.pager.button.jsx');

var Pager = React.createClass({
    render: function () {
        var items = [];
        var pageCount = this.props.pageCount;
        var currentPage = this.props.currentPage;
        var total = this.props.total;
        var currentPageStartIndex = 0;
        var currentPageEndIndex = 0;
        if (total != 0) {
            currentPageStartIndex = (this.props.currentPage - 1) * this.props.pageSize + 1;
            currentPageEndIndex = currentPageStartIndex + this.props.pageSize;
            if(currentPageEndIndex > total){
                currentPageEndIndex = total;
            }
        }
        /* previous page button  */
        // current page is the first page ，disable previous page button
        if (currentPage == 1) {
            items.push(<PageButton className="paginate_button previous disabled"
                                   key='previous'
                                   title='上一页'/>);
        }
        //current page is not the first page,enable previous page button
        else {
            items.push(<PageButton key='previous'
                                   title='上一页'
                                   onPageChanged={ this.props.onChanged }
                                   targetPageIndex={ currentPage - 1 }/>);
        }

        /* 
         total page count less than 7
         */
        if (pageCount <= 7) {
            for (var i = 1; i <= pageCount; i++) {
                if (currentPage == i) {
                    items.push(<PageButton className="paginate_button disabled active"
                                           key={i}
                                           title={i}/>);
                }
                else {
                    items.push(<PageButton key={i}
                                           title={i}
                                           onPageChanged={ this.props.onChanged }
                                           targetPageIndex={ i }/>);
                }
            }
        }
        /* pages more than 7 */
        else {
            /* 
             current page is in the first four pages
             example: previous | 1 | 2 | 3 | 4 | 5 | ... | { the last page } | next
             */
            if (currentPage < 5) {
                /* the one to five pages */
                for (var i = 1; i <= 5; i++) {
                    if (currentPage == i) {
                        items.push(<PageButton className="paginate_button disabled active"
                                               key={ i }
                                               title={ i }/>);
                    }
                    else {
                        items.push(<PageButton key={i}
                                               title={i}
                                               onPageChanged={ this.props.onChanged }
                                               targetPageIndex={ i }/>);
                    }
                }

                items.push(<PageButton className="paginate_button disabled"
                                       key={'more'}
                                       title={'...'}/>);

                /* the last page */
                items.push(<PageButton key={ pageCount }
                                       title={ pageCount }
                                       onPageChanged={ this.props.onChanged }
                                       targetPageIndex={ pageCount }/>);
            }
            /* 
             current page is in the last four pages
             example: previous | 1 | ... | { pageCount - 4 } | { pageCount - 3 } | { pageCount - 2} | { pageCount - 1 } | { pageCount } | next
             */
            else if ((pageCount - currentPage) < 4) {
                items.push(<PageButton key={ 1 }
                                       title={ 1 }
                                       onPageChanged={ this.props.onChanged }
                                       targetPageIndex={ 1 }/>);

                items.push(<PageButton className="paginate_button disabled"
                                       key={'more'}
                                       title={'...'}/>);

                for (var i = 4; i >= 0; i--) {
                    if (currentPage == (pageCount - i )) {
                        items.push(<PageButton key={ pageCount - i }
                                               title={ pageCount - i }
                                               className='paginate_button disabled active'/>);
                    }
                    else {
                        items.push(<PageButton key={ pageCount - i }
                                               title={ pageCount - i }
                                               onPageChanged={ this.props.onChanged }
                                               targetPageIndex={ pageCount - i }/>);
                    }
                }
            }
            else {

                items.push(<PageButton key={ 1 }
                                       title={ 1 }
                                       onPageChanged={ this.props.onChanged }
                                       targetPageIndex={ 1 }/>);

                items.push(<PageButton className="paginate_button disabled"
                                       key={ 'more-left' }
                                       title={ '...' }/>);

                items.push(<PageButton key={ currentPage - 1 }
                                       title={ currentPage - 1 }
                                       onPageChanged={ this.props.onChanged }
                                       targetPageIndex={ currentPage - 1 }/>);


                items.push(<PageButton key={ currentPage }
                                       title={ currentPage }
                                       className='active'/>);

                items.push(<PageButton key={ currentPage + 1 }
                                       title={ currentPage + 1 }
                                       onPageChanged={ this.props.onChanged }
                                       targetPageIndex={ currentPage + 1 }/>);

                items.push(<PageButton className="paginate_button disabled"
                                       key={ 'more-right' }
                                       title={ '...' }/>);

                items.push(<PageButton key={ pageCount }
                                       title={ pageCount }
                                       onPageChanged={ this.props.onChanged }
                                       targetPageIndex={ pageCount }/>);
            }
        }
        /* next page */
        if (currentPage >= pageCount) {
            items.push(<PageButton className="paginate_button next disabled"
                                   key='next'
                                   title='下一页'/>);
        }
        else {
            items.push(<PageButton className="paginate_button next"
                                   key='next'
                                   title='下一页'
                                   onPageChanged={ this.props.onChanged }
                                   targetPageIndex={ currentPage + 1 }/>);
        }

        return (<div className="row">
            <div className="col-sm-5">
                <div className="dataTables_info"
                     id="grid_info"
                     role="status"
                     aria-live="polite">显示第 { currentPageStartIndex } 至 { currentPageEndIndex } 项结果，共 { total } 项
                </div>
            </div>
            <div className="col-sm-7">
                <div className="dataTables_paginate paging_simple_numbers"
                     id="grid_paginate">
                    <ul className="pagination">{items}</ul>
                </div>
            </div>
        </div>);
    }
});

module.exports = Pager;