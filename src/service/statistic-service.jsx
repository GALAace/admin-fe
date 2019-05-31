import Util from 'util/bs.jsx';

const _bs = new Util();

class Statistic{
    // 首页数据统计
    getHomeCount(){
        return _bs.request({
            url: '/manage/statistic/base_count.do'
        });
    }
}

export default Statistic;