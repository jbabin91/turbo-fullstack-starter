INSERT INTO users("name") VALUES
  ('John'),
  ('Jane'),
  ('Joe');

INSERT INTO posts(title, content, user_id, draft) VALUES
  (
    'Title 1',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex leo, malesuada id nisi gravida, fringilla sodales nisi. Donec tincidunt, eros et dignissim molestie, mi augue blandit lorem, vitae commodo dolor felis a lacus.',
    1,
    false
  ),
  (
    'Title 2',
    'Maecenas aliquam vitae velit porttitor varius. Fusce sit amet vestibulum elit, et vestibulum nisi.',
    1,
    true
  ),
  (
    'Title 3',
    'Morbi a sollicitudin eros. Cras sit amet ante sed ligula sollicitudin iaculis eu eu dolor. Etiam viverra, est quis varius hendrerit, dui velit pulvinar velit, at tincidunt odio justo eu massa. In ultrices feugiat quam, nec vehicula neque ullamcorper non. Cras et sem consectetur, vestibulum felis ac, scelerisque nibh.',
    3,
    false
  );
