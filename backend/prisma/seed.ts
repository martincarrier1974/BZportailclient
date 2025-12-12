import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create super admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@bztelecom.com' },
    update: {},
    create: {
      email: 'admin@bztelecom.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
    },
  });

  console.log('✅ Created super admin:', superAdmin.email);

  // Create a demo tenant
  const tenant = await prisma.tenant.upsert({
    where: { name: 'Demo Client' },
    update: {},
    create: {
      name: 'Demo Client',
      companyName: 'Demo Company Inc.',
      contactEmail: 'contact@democompany.com',
      isActive: true,
    },
  });

  console.log('✅ Created tenant:', tenant.name);

  // Create tenant admin
  const tenantAdminPassword = await bcrypt.hash('admin123', 12);
  const tenantAdmin = await prisma.user.upsert({
    where: { email: 'admin@democompany.com' },
    update: {},
    create: {
      email: 'admin@democompany.com',
      password: tenantAdminPassword,
      firstName: 'Tenant',
      lastName: 'Admin',
      role: UserRole.TENANT_ADMIN,
      tenantId: tenant.id,
    },
  });

  console.log('✅ Created tenant admin:', tenantAdmin.email);

  // Create read-only user
  const readOnlyPassword = await bcrypt.hash('readonly123', 12);
  const readOnlyUser = await prisma.user.upsert({
    where: { email: 'readonly@democompany.com' },
    update: {},
    create: {
      email: 'readonly@democompany.com',
      password: readOnlyPassword,
      firstName: 'Read',
      lastName: 'Only',
      role: UserRole.READ_ONLY,
      tenantId: tenant.id,
    },
  });

  console.log('✅ Created read-only user:', readOnlyUser.email);

  console.log('\n📝 Default credentials:');
  console.log('Super Admin: admin@bztelecom.com / admin123');
  console.log('Tenant Admin: admin@democompany.com / admin123');
  console.log('Read Only: readonly@democompany.com / readonly123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

