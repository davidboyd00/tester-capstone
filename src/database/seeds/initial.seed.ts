import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Store } from '../../modules/stores/entities/store.entity';
import { User } from '../../modules/auth/entities/user.entity';
import { Role } from '../../common/enums';

export async function runSeed(dataSource: DataSource) {
  const storeRepo = dataSource.getRepository(Store);
  const userRepo = dataSource.getRepository(User);

  const stores = [
    { name: 'Providencia', region: 'Metropolitana', city: 'Providencia', address: 'Av. Providencia 291' },
    { name: 'Las Condes', region: 'Metropolitana', city: 'Las Condes', address: '' },
    { name: 'San Bernardo', region: 'Metropolitana', city: 'San Bernardo', address: '' },
    { name: 'Estacion Central', region: 'Metropolitana', city: 'Estacion Central', address: '' },
    { name: 'La Florida', region: 'Metropolitana', city: 'La Florida', address: '' },
    { name: 'Maipu', region: 'Metropolitana', city: 'Maipu', address: '' },
    { name: 'Puente Alto', region: 'Metropolitana', city: 'Puente Alto', address: '' },
    { name: 'Nunoa', region: 'Metropolitana', city: 'Nunoa', address: '' },
    { name: 'Santiago Centro', region: 'Metropolitana', city: 'Santiago', address: '' },
    { name: 'Quilicura', region: 'Metropolitana', city: 'Quilicura', address: '' },
    { name: 'Rancagua', region: 'OHiggins', city: 'Rancagua', address: '' },
    { name: 'Valparaiso', region: 'Valparaiso', city: 'Valparaiso', address: '' },
    { name: 'Vina del Mar', region: 'Valparaiso', city: 'Vina del Mar', address: '' },
    { name: 'Concepcion', region: 'Biobio', city: 'Concepcion', address: '' },
    { name: 'Temuco', region: 'Araucania', city: 'Temuco', address: '' },
    { name: 'Chillan', region: 'Nuble', city: 'Chillan', address: '' },
    { name: 'Antofagasta', region: 'Antofagasta', city: 'Antofagasta', address: '' },
    { name: 'La Serena', region: 'Coquimbo', city: 'La Serena', address: '' },
    { name: 'Talca', region: 'Maule', city: 'Talca', address: '' },
    { name: 'Osorno', region: 'Los Lagos', city: 'Osorno', address: '' },
    { name: 'Puerto Montt', region: 'Los Lagos', city: 'Puerto Montt', address: '' },
    { name: 'Iquique', region: 'Tarapaca', city: 'Iquique', address: '' },
    { name: 'Calama', region: 'Antofagasta', city: 'Calama', address: '' },
    { name: 'Arica', region: 'Arica y Parinacota', city: 'Arica', address: '' },
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
    console.log(`Seed: admin creado (${adminEmail} / Admin2026!)`);
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
    console.log(`Seed: store_user creado (${testEmail} / Tienda2026!)`);
  }
}
