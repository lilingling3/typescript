import {Router} from 'express';
import {use} from '../../core/gateway';
import {users,campaigns} from '../controller';
var router = Router();

/* GET home page. */
router.get('/', (req, res)=>res.send('respond with a resource'));
/* 获取所有用户 */
router.get('/users', use(users.GET));
/* 获取所有用户 */
router.get('/campaigns', use(campaigns.GET));
export default router;
