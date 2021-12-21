import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { classToPlain } from "class-transformer";

interface IUserRequest {
  id_user?: string;
  email: string;
  password: string;
  name: string;
  identity?: string;
  date_birth?: Date;
  address?: string;
  number?: string;
  district?: string;
  city?: string;
  state?: string;
  admin?: boolean;
}

interface IAuthenticateUserService {
  email: string;
  password: string;
}

class UserService {
  async createNew({
    email,
    password,
    name,
    identity,
    date_birth,
    address,
    number,
    district,
    city,
    state,
    admin,
  }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Email not filled");
    }
    if (!password) {
      throw new Error("Password not filled");
    }

    const userExists = await usersRepositories.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepositories.create({
      email,
      password: passwordHash,
      name,
      identity,
      date_birth,
      address,
      number,
      district,
      city,
      state,
      admin,
    });

    await usersRepositories.save(user);

    return user;
  }

  async update({
    id_user,
    email,
    password,
    name,
    identity,
    date_birth,
    address,
    number,
    district,
    city,
    state,
    admin,
  }: IUserRequest) {
    try {
      const usersRepositories = getCustomRepository(UsersRepositories);

      const user = await usersRepositories.findOne({ id_user });

      if (email != user.email) {
        const userExists = await usersRepositories.findOne({ email });
        if (userExists) {
          throw new Error("Email already exists");
        }
      }

      if (user.email != email) {
        user.email = email;
      }

      if (password) {
        const passwordHash = await hash(password, 8);
        user.password = passwordHash;
      }
      if (name && user.name != name) {
        user.name = name;
      }
      if (identity && user.identity != identity) {
        user.identity = identity;
      }
      if (date_birth && user.date_birth != date_birth) {
        user.date_birth = date_birth;
      }
      if (address && user.address != address) {
        user.address = address;
      }
      if (number && user.number != number) {
        user.number = number;
      }
      if (district && user.district != district) {
        user.district = district;
      }
      if (city && user.city != city) {
        user.city = city;
      }
      if (state && user.state != state) {
        user.state = state;
      }
      if (admin && user.admin != admin) {
        user.admin = admin;
      }
      await usersRepositories.save(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async auth({ email, password }: IAuthenticateUserService) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorret");
    }

    if (!(await compare(password, user.password))) {
      throw new Error("Email/Password incorret");
    }

    const token = sign(
      {
        email: user.email,
        admin: user.admin,
      },
      "104c531b108f35e220fce0f4dfe4830e",
      {
        subject: user.id_user,
        expiresIn: "1d",
      }
    );
    return {
      token,
      user: classToPlain(user),
    };
  }

  async delete(id_user) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = usersRepositories.delete(id_user);

    if (!user) {
      throw new Error("Usuario not found");
    }
    return user;
  }
}

export { UserService };
