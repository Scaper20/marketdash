import { Router } from 'express';
import { getMerchants, getMerchantCatalog } from '../controllers/merchant.controller';

const router = Router();

router.get('/', getMerchants);
router.get('/:id/catalog', getMerchantCatalog);

export default router;
