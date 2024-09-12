import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Component } from 'src/components/entities/component.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { PaymentDetails } from 'src/payment-details/entities/payment-details.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    @InjectRepository(PaymentDetails)
    private paymentDetailsRepository: Repository<PaymentDetails>,
  ) {}

  async seedUsers() {
    const users = [];
    const password = 'Seed.1234';
    const saltRounds = +this.configService.get<number>(
      'BCRYPT_SALT_ROUNDS',
      10,
    );
    const hashedPassword = await hash(password, saltRounds);

    for (let i = 0; i < 10; i++) {
      users.push(
        this.userRepository.create({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: hashedPassword,
          role: 'UPLOADER',
          status: true,
          avatar: faker.image.avatar(),
        }),
      );
    }

    for (let i = 0; i < 19; i++) {
      users.push(
        this.userRepository.create({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: hashedPassword,
          role: 'USER',
          status: true,
          avatar: faker.image.avatar(),
        }),
      );
    }

    users.push(
      this.userRepository.create({
        username: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'ADMIN',
        status: true,
        avatar: faker.image.avatar(),
      }),
    );

    await this.userRepository.save(users);
  }

  async seedPaymentDetails() {
    const uploaders = await this.userRepository.find({
      where: { role: 'UPLOADER' },
    });
    const paymentDetailsArray = [];

    uploaders.forEach((uploader) => {
      paymentDetailsArray.push(
        this.paymentDetailsRepository.create({
          cbu: faker.finance.accountNumber({ length: 22 }),
          alias: `${faker.animal.type()}.${faker.number.int({ min: 1000, max: 9999 })}`,
          name: faker.person.fullName(),
          cuil: faker.number
            .int({ min: 20000000000, max: 20999999999 })
            .toString(),
          user: uploader,
        }),
      );
    });

    await this.paymentDetailsRepository.save(paymentDetailsArray);
  }

  async seedCategories() {
    const categories = [
      'UI Components',
      'Layout Components',
      'Forms',
      'Charts',
      'Navigation',
      'Tables',
      'Widgets',
      'Modals',
      'Animations',
      'Data Visualization',
    ];

    const categoryEntities = categories.map((name) =>
      this.categoryRepository.create({ name }),
    );

    await this.categoryRepository.save(categoryEntities);
  }

  async seedPlans() {
    const plans = [
      {
        name: 'Bronze',
        description: 'Basic access with limited features.',
        quantity: 5,
        price: 15000.0,
        tiers: ['bronze'],
      },
      {
        name: 'Silver',
        description: 'Intermediate access with more features.',
        quantity: 10,
        price: 30000.0,
        tiers: ['silver', 'bronze'],
      },
      {
        name: 'Gold',
        description: 'Premium access with all features.',
        quantity: 15,
        price: 45000.0,
        tiers: ['gold', 'silver', 'bronze'],
      },
    ];

    const planEntities = plans.map((plan) => this.planRepository.create(plan));

    await this.planRepository.save(planEntities);

    console.log('Plans seeded.');
  }

  async seedComponents() {
    const uploaders = await this.userRepository.find({
      where: { role: 'UPLOADER' },
    });
    const categories = await this.categoryRepository.find();
    const plans = await this.planRepository.find();

    const components = [];

    for (const uploader of uploaders) {
      for (let i = 0; i < 2; i++) {
        const plan = faker.helpers.arrayElement(plans);
        const tier =
          plan.tiers.length > 0
            ? faker.helpers.arrayElement(plan.tiers)
            : 'bronze';

        const priceRange = {
          bronze: [1, 2],
          silver: [2, 4],
          gold: [4, 10],
        };
        const price = parseFloat(
          faker.number
            .float({
              min: priceRange[tier][0],
              max: priceRange[tier][1],
            })
            .toFixed(2),
        );

        const categoryCount = faker.number.int({ min: 1, max: 2 });
        const componentCategories = faker.helpers.arrayElements(
          categories,
          categoryCount,
        );

        components.push(
          this.componentRepository.create({
            name: faker.commerce.productName(),
            uploader,
            price,
            categories: componentCategories,
            plan,
            tier,
            rating: parseFloat(
              faker.number.float({ min: 1, max: 5 }).toFixed(1),
            ),
            description: faker.lorem.sentence(),
            video: faker.image.url(),
            image: faker.image.url(),
            readme: faker.lorem.paragraph(),
            structure: 'https://example.com/file.jsx',
            styles: 'https://example.com/styles.css',
            downloads: faker.number.int({ min: 0, max: 1000 }),
          }),
        );
      }
    }

    await this.componentRepository.save(components);
  }

  async runSeeds() {
    try {
      console.log('Starting seed process...');

      await this.seedUsers();
      console.log('Users seeded successfully.');

      await this.seedPaymentDetails();
      console.log('Payment details seeded successfully.');

      await this.seedCategories();
      console.log('Categories seeded successfully.');

      await this.seedPlans();
      console.log('Plans seeded successfully.');

      await this.seedComponents();
      console.log('Components seeded successfully.');

      console.log('All seeds have been applied successfully.');
    } catch (error) {
      console.error('Error during seeding process:', error);
    }
  }
}
