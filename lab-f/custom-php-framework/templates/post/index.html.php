<?php

/** @var \App\Model\Post[] $posts */
/** @var \App\Service\Router $router */

$title = 'Post List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Your IDs:</h1>

    <ul class="index-list">
        <?php foreach ($posts as $post): ?>
            <li><h3><?= $post->getName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('post-show', ['id' => $post->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('post-edit', ['id' => $post->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

    <a href="<?= $router->generatePath('post-create') ?>">Add a new ID.</a>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
