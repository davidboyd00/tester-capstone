import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Store } from '../../modules/stores/entities/store.entity';
import { User } from '../../modules/auth/entities/user.entity';
import { Role } from '../../common/enums';

export async function runSeed(dataSource: DataSource) {
  const storeRepo = dataSource.getRepository(Store);
  const userRepo = dataSource.getRepository(User);

  // Seed tiendas
  const stores = [
    { name: 'Providencia', region: 'Metropolitana', city: 'Providencia' },
    { name: 'Las Condes', region: 'Metropolitana', city: 'Las Condes' },
    { name: 'San Bernardo', region: 'Metropolitana', city: 'San Bernardo' },
    { name: 'Estacion Central', region: 'Metropolitana', city: 'Estacion Central' },
    { name: 'La Florida', region: 'Metropolitana', city: 'La Florida' },
    { name: 'Maipu', region: 'Metropolitana', city: 'Maipu' },
    { name: 'Puente Alto', region: 'Metropolitana', city: 'Puente Alto' },
    { name: 'Nunoa', region: 'Metropolitana', city: 'Nunoa' },
    { name: 'Santiago Centro', region: 'Metropolitana', city: 'Santiago' },
    { name: 'Quilicura', region: 'Metropolitana', city: 'Quilicura' },
    { name: 'Rancagua', region: 'OHiggins', city: 'Rancagua' },
    { name: 'Valparaiso', region: 'Valparaiso', city: 'Valparaiso' },
    { name: 'Vina del Mar', region: 'Valparaiso', city: 'Vina del Mar' },
    { name: 'Concepcion', region: 'Biobio', city: 'Concepcion' },
    { name: 'Temuco', region: 'Araucania', city: 'Temuco' },
    { name: 'Chillan', region: 'Nuble', city: 'Chillan' },
    { name: 'Antofagasta', region: 'Antofagasta', city: 'Antofagasta' },
    { name: 'La Serena', region: 'Coquimbo', city: 'La Serena' },
    { name: 'Talca', region: 'Maule', city: 'Talca' },
    { name: 'Osorno', region: 'Los Lagos', city: 'Osorno' },
    { name: 'Puerto Montt', region: 'Los Lagos', city: 'Puerto Montt' },
    { name: 'Iquique', region: 'Tarapaca', city: 'Iquique' },
    { name: 'Calama', region: 'Antofagasta', city: 'Calama' },
    { name: 'Arica', region: 'Arica y Parinacota', city: 'Arica' },
  ];

  const existingStores = await storeRepo.count();
  if (existingStores === 0) {
    await storeRepo.save(stores.map((s) => storeRepo.create(s)));
    console.log(`Seed: ${stores.length} tiendas creadas`);
  } else {
    console.log(`Seed: tiendas ya existen (${existingStores})`);
  }

  // Seed admin user
  const existingAdmin = await userRepo.findOne({ where: { email: 'admin@coaniquem.cl' } });
  if (!existingAdmin) {
    const admin = userRepo.create({
      email: 'admin@coaniquem.cl',
      name: 'Administrador',
      password: await bcrypt.hash('Admin2026!', 12),
      role: Role.ADMIN,
      storeId: null,
    });
    await userRepo.save(admin);
    console.log('Seed: usuario admin creado (admin@coaniquem.cl / Admin2026!)');
  } else {
    console.log('Seed: usuario admin ya existe');
  }

  // Seed store_user de prueba (Providencia)
  const existingStoreUser = await userRepo.findOne({ where: { email: 'jefe.providencia@coaniquem.cl' } });
  if (!existingStoreUser) {
    const providencia = await storeRepo.findOne({ where: { name: 'Providencia' } });
    if (providencia) {
      const storeUser = userRepo.create({
        email: 'jefe.providencia@coaniquem.cl',
        name: 'Jefe Tienda Providencia',
        password: await bcrypt.hash('Tienda2026!', 12),
        role: Role.STORE_USER,
        storeId: providencia.id,
      });
      await userRepo.save(storeUser);
      console.log('Seed: store_user creado (jefe.providencia@coaniquem.cl / Tienda2026!)');
    }
  } else {
    console.log('Seed: store_user ya existe');
  }
}
