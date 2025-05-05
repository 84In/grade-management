import { SetMetadata } from '@nestjs/common';

/**
 * Khóa metadata dùng để lưu vai trò yêu cầu của route
 */
export const ROLES_KEY = 'roles';

/**
 * @Roles() decorator cho phép khai báo các vai trò được phép truy cập route.
 * Ví dụ: @Roles('admin'), @Roles('teacher', 'admin')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
