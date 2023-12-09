<?php
    /** @var $post ?\App\Model\Post */
?>

<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="post[name]" value="<?= $post ? $post->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="surname">Surname</label>
    <input type="text" id="name" name="post[surname]" value="<?= $post ? $post->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" name="post[description]"><?= $post? $post->getDescription() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
