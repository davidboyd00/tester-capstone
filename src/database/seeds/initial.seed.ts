import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Store } from '../../modules/stores/entities/store.entity';
import { User } from '../../modules/auth/entities/user.entity';
import { Role } from '../../common/enums';

export async function runSeed(dataSource: DataSource) {
  const storeRepo = dataSource.getRepository(Store);
  const userRepo = dataSource.getRepository(User);

  const stores = [
    { name: 'Providencia', city: 'Providencia', address: 'Av. Providencia 291' },
    { name: 'Las Condes', city: 'Las Condes', address: 'Av. Apoquindo 3000' },
    { name: 'San Bernardo', city: 'San Bernardo', address: '' },
    { name: 'Estacion Central', city: 'Estacion Central', address: '' },
    { name: 'La Florida', city: 'La Florida', address: '' },
    { name: 'Maipu', city: 'Maipu', address: '' },
    { name: 'Puente Alto', city: 'Puente Alto', address: '' },
    { name: 'Nunoa', city: 'Nunoa', address: '' },
    { name: 'Santiago Centro', city: 'Santiago', address: '' },
    { name: 'Quilicura', city: 'Quilicura', address: '' },
    { name: 'Rancagua', city: 'Rancagua', address: '' },
    { name: 'Valparaiso', city: 'Valparaiso', address: '' },
    { name: 'Vina del Mar', city: 'Vina del Mar', address: '' },
    { name: 'Concepcion', city: 'Concepcion', address: '' },
    { name: 'Temuco', city: 'Temuco', address: '' },
    { name: 'Chillan', city: 'Chillan', address: '' },
    { name: 'Antofagasta', city: 'Antofagasta', address: '' },
    { name: 'La Serena', city: 'La Serena', address: '' },
    { name: 'Talca', city: 'Talca', address: '' },
    { name: 'Osorno', city: 'Osorno', address: '' },
    { name: 'Puerto Montt', city: 'Puerto Montt', address: '' },
    { name: 'Iquique', city: 'Iquique', address: '' },
    { name: 'Calama', city: 'Calama', address: '' },
    { name: 'Arica', city: 'Arica', address: '' },
  ];

  const existingStores = await storeRepo.count();
  if (existingStores === 0) {
    await storeRepo.save(stores.map((s) => storeRepo.create(s)));
    console.log(`Seed: ${stores.length} tiendas creadas`);
  } else {
    console.log(`Seed: tiendas ya existen (${existingStores})`);
  }

  const adminEmail = 'admin@coaniquem.cl';
  if (!(await userRepo.findOne({ where: { email: adminEmail } }))) {
    await userRepo.save(userRepo.create({
      email: adminEmail,
      name: 'Administrador',
      password: await bcrypt.hash('Admin2026!', 12),
      role: Role.ADMIN,
      storeId: null,
    }));
    console.log('Seed: admin creado (admin@coaniquem.cl / Admin2026!)');
  }

  const testEmail = 'jefe.providencia@coaniquem.cl';
  const providencia = await storeRepo.findOne({ where: { name: 'Providencia' } });
  if (!(await userRepo.findOne({ where: { email: testEmail } })) && providencia) {
    await userRepo.save(userRepo.create({
      email: testEmail,
      name: 'Jefe Tienda Providencia',
      password: await bcrypt.hash('Tienda2026!', 12),
      role: Role.STORE_USER,
      storeId: providencia.id,
    }));
    console.log('Seed: store_user creado (jefe.providencia@coaniquem.cl / Tienda2026!)');
  }
}
